
interface PreviewCardTypes{
    country: string,
    region: string,
}


export default function PreviewCard({country, region}:PreviewCardTypes) {
  return (
    <div className="flex rounded p-4 m-4 border">
      <div>
        <img src="" alt="imageName" className="" />
      </div>
      <div>
        <h3>{country}</h3>
        <p>{region}</p>
        <button>See more</button>
      </div>
    </div>
  );
}
