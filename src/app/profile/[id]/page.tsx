

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <hr className="w-1/2 mb-4" />
      <p className="text-lg">
        Profile page for user ID: <span className="font-semibold">{params.id}</span>
      </p>
    </div>
  );
}
