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
  tokenId: number;
  tokenUri: string;
  amount: number;
  creator: string;
  stock: number | null;
}

interface selectable {
  name: string;
  selected: boolean;
}