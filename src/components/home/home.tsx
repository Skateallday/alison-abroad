import './styles.css';
import ImageFlair from '../image-flair/imageflair';
import Header from '../header/header';
import RunningTotals from '../runningtotals/runningtotals';

function Home() {
  return (
    <div className="">
      <header>
        <Header />
      </header>

      <main>
        <section className="left-column flex flex-col md:flex-row w-full overflow-hidden">
          <div className="w-full md:w-1/2 p-6 md:p-10 text-left">
            <div className="card--b">
              <span className="eyebrows">Welcome</span>
              </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Hey there!
            </h2>

            <p className="text-lg md:text-xl text-white mb-4">
              Alison has always had a passion for travel, and over the years,
              she's had the opportunity to explore some of the most beautiful
              cities and towns in Europe. From the charming villages of the UK
              to the majestic peaks of the Alps, Alison has captured some truly
              stunning images on her travels.
            </p>

            <p className="text-lg md:text-xl text-white mb-4">
              This website is a place for Alison to share her favourite images
              with the world, and for you to browse through her collection of
              European adventures. Whether you're dreaming of your next European
              getaway, or simply want to admire some breathtaking scenery, you've
              come to the right place.
            </p>

            <p className="text-lg md:text-xl text-white mb-4">
              Take a look around, and discover the beauty of Europe through
              Alison's lens. And who knows — maybe you'll even be inspired to
              plan your own European adventure!
            </p>
          </div>

          <div className="w-full md:w-1/2 overflow-hidden">
            <ImageFlair />
          </div>
        </section>
        <section>
          <RunningTotals />
        </section>
      </main>
    </div>
  );
}

export default Home;