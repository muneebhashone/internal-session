export const NestedRouteComponent = () => {
  return <div>NestedRoute</div>;
};

const NestedRoute = () => {
  return (
    <>
      <div>NestedRoute</div>
      <NestedRouteComponent />
    </>
  );
};

export default NestedRoute;
