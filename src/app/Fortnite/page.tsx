export default function Fortnite() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-center font-bold text-4xl text-white">Fortnite</h1>
      <p className="text-lg mt-4 text-center text-white">Welcome to the Fortnite section!</p>
      <p className="mt-2 text-lg text-center text-white">Here you can find all Fortnite-related content.</p>
      
      <div className="flex gap-4 mt-8 max-w-4xl mx-auto">
        <div className="flex-1 bg-white rounded-lg p-6 text-black">
          <h2 className="text-xl font-bold mb-4 text-center">S1</h2>
        </div>

        <div className="flex-1 bg-white rounded-lg p-6 text-black">
          <h2 className="text-xl font-bold mb-4 text-center">S2</h2>
        </div>

        <div className="flex-1 bg-white rounded-lg p-6 text-black">
          <h2 className="text-xl font-bold mb-4 text-center">S3</h2>
        </div>
      </div>
      
    </div>
  );
}