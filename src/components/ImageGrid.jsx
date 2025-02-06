import { useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ImageCard } from './'

export default function ImageGrid({ images, callback, fetchStatus }) {
    const [loadedImages, setLoadedImages] = useState({});

    function handleImageLoad(id) {
        setLoadedImages((prev) => ({ ...prev, [id]: true }));
        console.log(loadedImages);
        return loadedImages;
    }
    return (
        <InfiniteScroll
            className="ml-auto overflow-hidden"
            dataLength={images.length}
            next={callback}
            hasMore={fetchStatus === 'empty' ? false : true}
        >
            <ResponsiveMasonry className="w-[80%] m-auto" columnsCountBreakPoints={{ 350: 2, 640: 4, 900: 4 }}>
                <Masonry gutter='1rem'>

                    {images.map(
                        (imageData, i) =>
                            <ImageCard
                                key={imageData.id}
                                imageData={imageData}
                                isLoaded={loadedImages[imageData.id] || false}
                                onLoad={() => handleImageLoad(imageData.id)}
                            />)}
                </Masonry>
            </ResponsiveMasonry>
        </InfiniteScroll>
    )
}
