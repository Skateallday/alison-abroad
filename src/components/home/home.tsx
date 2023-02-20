import './styles.css';
import imageFlair from '../image-flair/imageflair'

function Home() {
  return (
    <div className="App">            

      <header className="App-header">
        

        

      <div className="grid grid-cols-1 md:grid-cols-2">
       <div className="justify-center text-left p-10"> 
       <h1 className="text-5xl py-5 ">Welcome to <br /> Alison Abroad</h1>
       <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni minus repellendus labore natus ut, sint accusantium similique sit nulla molestias perspiciatis non minima repudiandae sequi omnis maxime aspernatur maiores earum.</p>
      </div>
      <div>
      {imageFlair()}
      </div>
      </div>
      </header>
      <main>
        <div className="bg-orange-600	bg-cover">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae facere error, aperiam delectus saepe vitae enim ut labore culpa amet laudantium cum optio ea ipsum odio quasi similique quos vel.
        </div>
      </main>

    </div>
    
  );
}

export default Home; 

