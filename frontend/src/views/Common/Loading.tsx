import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux";
import LoadingScreen from '../../components/Common/Loading';

const Loading = () => {

  const navigate = useNavigate();

  const isLoadingForSignIn = useSelector((state: RootState) => state.user.isLoading);
  const isLoadingForSignOut = useSelector((state: RootState) => state.user.isLoading);

  useEffect(() => {
    if (!isLoadingForSignIn) {
      const prevPath = localStorage.getItem('prevPath');
      navigate(prevPath || '/');
    }
  }, [isLoadingForSignIn]);

  useEffect(() => {
    if (!isLoadingForSignOut) {
      const prevPath = localStorage.getItem('prevPath');
      navigate(prevPath || '/');
    }
  }, [isLoadingForSignOut]);

  return (
    <LoadingScreen />
  );
};

export default Loading;
