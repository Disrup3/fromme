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
};