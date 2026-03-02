import Lottie from "lottie-react";
import notFoundAnimation from "../../assets/notFound/notfound.json";

export default function NotFound() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Lottie
          animationData={notFoundAnimation}
          loop={true}
          style={{ width: 400 }}
        />
      </div>
    </>
  );
}
