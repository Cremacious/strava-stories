import CreateCircleForm from './CreateCircleForm';

const CreateCirclePage = () => {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Create a New Circle
      </h1>
      <div className="max-w-xl mx-auto">
        <CreateCircleForm />
      </div>
    </div>
  );
};

export default CreateCirclePage;
