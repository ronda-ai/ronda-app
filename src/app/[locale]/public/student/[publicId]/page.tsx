
import PublicStudentProfile from './_components/PublicStudentProfile';

// This is now a Server Component
export default function PublicStudentProfilePage({ params }: { params: { publicId: string } }) {
  // We extract the param on the server and pass it as a simple prop to the client component.
  // This avoids the "param property was accessed directly" error.
  return <PublicStudentProfile publicId={params.publicId} />;
}
