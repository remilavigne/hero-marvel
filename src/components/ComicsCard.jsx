export default function ComicsCard({ comic }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <img
        className="w-full h-48 object-cover"
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{comic.title}</h2>
      </div>
    </div>
  );
}