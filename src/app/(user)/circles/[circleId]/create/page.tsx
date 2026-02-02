import CreateForm from './CreateForm';

export default async function CircleFeatureCreatePage({
  searchParams,
  params,
}: {
  searchParams: { type?: string };
  params: Promise<{ circleId: string }>;
}) {
  const { circleId } = await params;
  return (
    <div className='px-2 md:px-4'>
      <CreateForm type={searchParams.type} circleId={circleId} />
    </div>
  );
}
