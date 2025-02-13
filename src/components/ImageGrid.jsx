import { useState, useRef } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ImageCard } from './'

export default function ImageGrid({ images, callback, fetchStatus, css }) {
    const [loadedImages, setLoadedImages] = useState({});
    const [gridCols, setGridCols] = useState(4);

    function handleImageLoad(id) {
        setLoadedImages((prev) => ({ ...prev, [id]: true }));
        if(loadedImages.length < 4) {
            setGridCols(loadedImages.length);
        } else {
            setGridCols(4)
        }
    }

    return (
        <InfiniteScroll
            className="ml-auto overflow-hidden"
            dataLength={images.length}
            next={callback}
            hasMore={fetchStatus === 'empty' ? false : true}
        >
            <ResponsiveMasonry className={"w-full m-auto justify-center " + css} columnsCountBreakPoints={{ 350: 2, 640: gridCols, 900: 4 }}>
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
