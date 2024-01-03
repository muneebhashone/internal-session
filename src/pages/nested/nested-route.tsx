export const NestedRouteComponent = () => {
  return <div>NestedRouteComponent</div>;
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
