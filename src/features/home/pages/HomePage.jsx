import { Link } from "react-router-dom";
import thumbEx01 from "../../../assets/thumbnail_ex01.png"
import thumbEx02 from "../../../assets/thumbnail_ex02.png"

function HomePage() {
    const projects = [
        {
        id: "ex01",
        title: "🎮 Tic Tac Toe",
        desc: "A fun little game built with React",
        thumbnail: thumbEx01
        },
        {
        id: "ex02",
        title: "📸 Picsum Photo Gallery",
        desc: "An infinite-scrolling photo gallery using Picsum API",
        thumbnail: thumbEx02
        },
    ];

    return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-6">
      <div className="absolute top-6 right-6 z-10">
        <Link 
          to="/ex03" 
          className="
            bg-white/10 backdrop-blur-sm
            text-gray-200 text-sm font-medium
            px-4 py-2 rounded-lg
            shadow-md
            transition-all duration-300
            hover:bg-white/20 hover:text-white
            hover:shadow-lg
          "
        >
          Login / Register
        </Link>
      </div>
      
      <h1 className="text-5xl font-extrabold mb-12 text-center">
        🪐 theVPN's React Lab
      </h1>

      <div className="grid sm:grid-cols-2 gap-10 w-full max-w-5xl">
        {projects.map((p) => (
          <Link
            key={p.id}
            to={`/${p.id}`}
            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h2 className="text-2xl font-semibold">{p.title}</h2>
              <p className="text-gray-300 mt-2">{p.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        © 2025 theVPN’s React Lab 🚀
      </footer>
    </div>
  );
}

export default HomePage;