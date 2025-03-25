import { Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ContractDataLoader = ({ request, children, loadingMessage = "Loading..." , errorColor = "red"}) => {
  const { contractId } = useParams();
  const { user } = useAuth();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const response = await request(user.uid, contractId);
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [user, contractId, request]);

  if (loading) {
    return <Typography>{loadingMessage}</Typography>;
  }

  if (error) {
    return <Typography color={errorColor}>{error}</Typography>;
  }

  return children(data);
};

ContractDataLoader.propTypes = {
  request: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  loadingMessage: PropTypes.string,
  errorColor: PropTypes.string,
};