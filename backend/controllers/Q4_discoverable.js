class CircleController {
  // Method to get discoverable circles for a parent
  static async getDiscoverableCircles(req, res) {
    try {
      const parent = req.user; // Get the parent from the request
      const {
        location,
        school,
        searchQuery,
        page = 1, // Default to page 1
        limit = 10 // Default to 10 results per page
      } = req.query;

      // Build the base query for discoverable circles
      const baseQuery = {
        isOptIn: true, // Only include circles that are opted in
        'discoverabilitySettings.visibility': 'public', // Only public circles
        parents: { $ne: parent._id } // Exclude circles the parent is already in
      };

      // Add location filter if specified
      if (location) {
        baseQuery['discoverabilitySettings.locationRestricted'] = true;
        baseQuery['discoverabilitySettings.allowedLocations'] = location;
      }

      // Add school filter if specified
      if (school) {
        baseQuery['discoverabilitySettings.schoolRestricted'] = true;
        baseQuery['discoverabilitySettings.allowedSchools'] = school;
      }

      // Add search query if specified
      if (searchQuery) {
        baseQuery.$or = [
          { name: { $regex: searchQuery, $options: 'i' } }, // Search by name
          { description: { $regex: searchQuery, $options: 'i' } } // Search by description
        ];
      }

      // Get the parent's current circles for recommendations
      const parentCircles = await Circle.find({ parents: parent._id });
      const parentCircleIds = parentCircles.map(circle => circle._id); // Extract circle IDs

      // Find discoverable circles based on the constructed query
      const circles = await Circle.find(baseQuery)
        .populate('parentCircleId') // Populate parent circle details
        .sort({ createdAt: -1 }) // Sort by creation date (newest first)
        .skip((page - 1) * limit) // Skip results for pagination
        .limit(limit); // Limit the number of results

      // Calculate recommendation scores for each circle
      const recommendedCircles = circles.map(circle => {
        let score = 0;

        // Increase score if circle is related to parent's existing circles
        if (parentCircleIds.includes(circle.parentCircleId?._id)) {
          score += 2;
        }

        // Increase score if circle has the same location/school
        if (circle.discoverabilitySettings.allowedLocations?.includes(parent.location)) {
          score += 1;
        }
        if (circle.discoverabilitySettings.allowedSchools?.includes(parent.school)) {
          score += 1;
        }

        // Return the circle with its recommendation score
        return {
          ...circle.toObject(),
          recommendationScore: score
        };
      });

      // Sort recommended circles by their scores
      recommendedCircles.sort((a, b) => b.recommendationScore - a.recommendationScore);

      // Get the total number of discoverable circles
      const total = await Circle.countDocuments(baseQuery);

      // Send the response with the recommended circles and pagination info
      return res.status(200).json({
        success: true,
        data: recommendedCircles,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit) // Calculate total pages
        }
      });
    } catch (error) {
      console.error('Error getting discoverable circles:', error);
      return res.status(400).json({
        success: false,
        error: error.message // Send error message in response
      });
    }
  }
}

export default CircleController;
