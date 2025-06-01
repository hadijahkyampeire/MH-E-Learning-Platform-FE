function UnAuthorized() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
        <p className="text-lg">You do not have permission to view this page.</p>
      </div>
    </div>
  );
}
export default UnAuthorized;