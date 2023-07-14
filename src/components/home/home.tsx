import './styles.css';
import imageFlair from '../image-flair/imageflair'
import Header from '../header/header'

function Home() {
  return (
    <div className="App">            

      <header>
              {Header()} 

     
      </header>
      <main>
      <div className="bg-gray-700 grid grid-cols-1 md:grid-cols-2">
       <div className="justify-center text-left p-10"> 
  <h2 className="text-5xl font-bold text-white mb-8">Hey there!</h2>
  <p className="text-xl text-white mb-4">Alison has always had a passion for travel, and over the years, she's had the opportunity to explore some of the most beautiful cities and towns in Europe. From the charming villages of the UK to the majestic peaks of the Alps, Alison has captured some truly stunning images on her travels.</p>
  <p className="text-xl text-white mb-4">This website is a place for Alison to share her favorite images with the world, and for you to browse through her collection of European adventures. Whether you're dreaming of your next European getaway, or simply want to admire some breathtaking scenery, you've come to the right place.</p>
  <p className="text-xl text-white mb-4">Take a look around, and discover the beauty of Europe through Alison's lens. And who knows - maybe you'll even be inspired to plan your own European adventure!</p>
</div>

      <div>
      {imageFlair()}
      </div>
      </div>
      </main>

    </div>
    
  );
}

export default Home; 

