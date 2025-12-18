import CreateForm from './CreateForm';

export default function CircleFeatureCreatePage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  return <CreateForm type={searchParams.type} />;
}
