import { useEffect, useState } from "react"
import { fetchRandomImagesfromAPI } from "../js/handleImageAPI"
import ImageElement from "./ImageElement";
export default function RelatedImages({ query, count }) {
    const [relatedImages, setRelatedImages] = useState([]);
    const [loadedImages, setLoadedImages] = useState({});

    const css = 'h-full w-full object-cover';

    function handleUrl(e, id) {
        e.preventDefault();
        window.location.href = `/image/${id}`
    }
    useEffect(() => {
        fetchRandomImagesfromAPI(query, count)
            .then(res => {
                setRelatedImages(res.data);
            })
            .catch(err => console.error(err))
    }, [query, count])

    function handleImageLoad(id) {
        if (!loadedImages[id]) {
            setLoadedImages(prev => ({ ...prev, [id]: true }))
        }
    }
    return (
        <div className="grid grid-flow-col w-svw gap-4 scrollbar-gutter-stable pb-4 overflow-auto">
            {relatedImages.map(image => (
                <a onClick={(e) => handleUrl(e, image.id)} key={image.id} to={`/image/${image.id}`} style={{ aspectRatio: 16 / 9, width: '240px', cursor: 'pointer' }}>
                    <ImageElement src={image?.urls.small} alt={image?.alt_description} css={css} isLoaded={loadedImages[image.id] ?? false} onLoad={() => handleImageLoad(image.id)} blurhash={image?.blur_hash} />
                </a>
            ))}
        </div>
    )
}
