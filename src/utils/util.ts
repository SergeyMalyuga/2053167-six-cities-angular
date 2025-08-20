import {Offer, OfferPreview} from '../types/offers';

export function offerAdapter(offer: Offer): OfferPreview {
  return {
    id: offer.id,
    title: offer.title,
    type: offer.type,
    price: offer.price,
    city: {
      name: offer.city.name,
      location: {
        latitude: offer.city.location.latitude,
        longitude: offer.city.location.longitude,
        zoom: offer.city.location.zoom,
      }
    },
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      zoom: offer.location.zoom,
    },
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: offer.rating,
    previewImage: ''
  };
}
