export default function DownloadButton({ icon, text, imageLink, filename }) {
    async function downloadImage() {
        try {
            const response = await fetch(imageLink);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.removeChild(a);
        } catch(error) {
            console.log(error)
        }
    }
    return (
      <button className='bg-ntrl-clr-100 w-full text-ntrl-clr-300 font-semibold text-base flex gap-2 justify-center items-center px-6 py-4 rounded-[0.25rem]' onClick={downloadImage}><span>{icon}</span>{text}</button>
    )
  }
  