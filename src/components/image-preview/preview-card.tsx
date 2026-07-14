
interface PreviewCardTypes{
  image:string,
    country: string,
    region: string,
}


export default function PreviewCard({image, country, region}:PreviewCardTypes) {
  return (
    <div className="flex rounded p-4 m-4 border">
      <div className="px-2">
        <img src={image} alt="imageName" className="rounded-md" />
      </div>
      <div>
        <h3>{country}</h3>
        <p>{region}</p>
        <button>See more</button>
      </div>
    </div>
  );
}
