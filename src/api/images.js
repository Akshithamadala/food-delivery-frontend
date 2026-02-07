// src/api/images.js - DYNAMIC IMAGE API
export const getDynamicImages = async (restaurantId, itemType = 'restaurant') => {
  const imageEndpoints = {
    restaurant: [
      'https://source.unsplash.com/400x140/?pizza',
      'https://source.unsplash.com/400x140/?burger', 
      'https://source.unsplash.com/400x140/?biryani',
      'https://source.unsplash.com/400x140/?salad',
      'https://source.unsplash.com/400x140/?mcdonalds',
      'https://source.unsplash.com/400x140/?indian',
      'https://source.unsplash.com/400x140/?chicken',
      'https://source.unsplash.com/400x140/?veg'
    ],
    menu: [
      'https://source.unsplash.com/300x200/?pizza',
      'https://source.unsplash.com/300x200/?burger',
      'https://source.unsplash.com/300x200/?biryani',
      'https://source.unsplash.com/300x200/?salad',
      'https://source.unsplash.com/300x200/?chicken',
      'https://source.unsplash.com/300x200/?indian',
      'https://source.unsplash.com/300x200/?dessert',
      'https://source.unsplash.com/300x200/?pasta'
    ]
  };

  // Dynamic fallback with restaurant ID
  const index = (restaurantId - 1) % imageEndpoints[itemType].length;
  return imageEndpoints[itemType][index];
};
