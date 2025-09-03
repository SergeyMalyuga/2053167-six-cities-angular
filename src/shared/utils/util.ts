import { Offer, OfferPreview } from '../../core/models/offers';
import { Comment } from '../../core/models/comments';

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
      },
    },
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      zoom: offer.location.zoom,
    },
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: offer.rating,
    previewImage: '',
  };
}

export function sortByDate(commentOne: Comment, commentTwo: Comment): number {
  const dateOne = new Date(commentOne.date).getTime();
  const dateTwo = new Date(commentTwo.date).getTime();
  return dateTwo - dateOne;
}
