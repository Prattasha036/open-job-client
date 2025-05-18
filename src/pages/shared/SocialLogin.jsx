import React, { useContext } from "react";

import AuthContext from "../../context/AuthContext";

const SocialLogin = () => {
  const { singInWithGoogle } = useContext(AuthContext);

  const handlegoogle = () => {
    singInWithGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="mb-2 flex justify-center">
      <button
        onClick={handlegoogle}
        className="btn btn-active btn-accent rounded-2xl text-white"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
