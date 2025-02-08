import { useEffect } from "react";
import { Blurhash } from "react-blurhash";

export default function ImageElement({ src, alt, css, isLoaded, onLoad, blurhash }) {
  
  useEffect(() => {
    if (!isLoaded) {
      const img = new Image();
      img.src = src;
      img.onload = onLoad; // Call parent function to mark as loaded
    }
  }, [src, isLoaded, onLoad]);


  useEffect(() => {
    console.log(isLoaded)

},[])
  return (
    <>
      {!isLoaded ? (
        <Blurhash
          hash={blurhash ?? "LEHLk~WB2yk8pyo0adR*.7kCMdnj" }
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <img src={src} alt={alt} className={css} />
      )}
    </>
  );
}
