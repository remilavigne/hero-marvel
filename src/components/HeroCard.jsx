export default function HeroCard({ hero, onClick }) {
    return (
        <div 
            className="bg-white rounded-lg shadow-md justify-center cursor-pointer" 
            onClick={() => onClick(hero.id)}>
                <img 
                    src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                    alt={hero.name}
                    className="rounded-t-lg w-full h-48 object-cover"
                />
                <h5 className="p-2 mb-2 text-2xl font-bold tracking-tight text-gray-900">{hero.name}</h5>
        </div>
    );
}