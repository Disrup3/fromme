interface CarouselItem {
  image: string;
  title: string;
  creator: string;
  precio: number;
}

interface FormCreate {
  title?: string;
  description?: string;
  image?: File;
  category?: string;
  price?: number;
  royalties?: number;
}

interface ExploreItem {
  image: string;
  title: string;
  creator: string;
  favorites: number;
  stock: number;
  amount: number | string;
}

interface selectable {
  name: string;
  selected: boolean;
}
