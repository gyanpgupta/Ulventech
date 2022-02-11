import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@mui/material";

function FormWrapper() {
  const [formState, updateFormState] = useState([
    {
      e: { target: "" },
      type: "",
      value: "",
      index: "",
      fieldName: "",
      options: [],
      text: "",
      email: "",
    },
  ]);

  const [sub, updatesub] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [response, updateResponse] = useState({});
  console.log(formState);
  useEffect(() => {
    axios
      .get("https://ulventech-react-exam.netlify.app/api/form")
      .then((data) => {
        updateFormState(data.data.data);
        updatesub(false);
      });
  }, []);

  console.log("formsayetet", formState);
  const onInputChange = (e: any, index: any) => {
    formState.map((item, index1) => {
      if (index == index1) {
        {
          item.value = e.target.value;
        }
      }
    });
    updateFormState([...formState]);
  };
  const handleSubmit = async () => {
    let obj = {};
    formState.forEach((item) => {
      obj = { ...obj, [item.fieldName]: item.value };
    });
    try {
      setButtonDisabled(true);
      const res = await axios.post(
        "https://ulventech-react-exam.netlify.app/api/form",
        obj
      );

      console.log(res.data);
      if (res.data.success) {
        updateResponse(res.data);
        setButtonDisabled(false);
      } else {
        alert("something went wrong ");
      }
    } catch {
      alert("something went wrong");
    }
  };
  return (
    <>
      {sub ? (
        <CircularProgress />
      ) : (
        <div className="App" style={{ margin: 0 }}>
          {formState.map((item, index) => {
            return (
              <>
                {item.type === "text" && (
                  <input
                    style={{ marginTop: 0 }}
                    type="text"
                    name={item.fieldName}
                    disabled={buttonDisabled}
                    value={item.value}
                    onChange={(e) => onInputChange(e, index)}
                  />
                )}
                {item.type === "email" && (
                  <input
                    style={{ margin: 0 }}
                    type="email"
                    name={item.fieldName}
                    disabled={buttonDisabled}
                    value={item.value}
                    onChange={(e) => onInputChange(e, index)}
                  />
                )}
                <br />
                {item.type === "number" && (
                  <input
                    type="number"
                    style={{ margin: -6 }}
                    value={item.value}
                    disabled={buttonDisabled}
                    onChange={(e) => onInputChange(e, index)}
                  />
                )}
                {item.type === "multiline" && (
                  <textarea
                    style={{ margin: -6 }}
                    value={item.value}
                    disabled={buttonDisabled}
                    onChange={(e) => onInputChange(e, index)}
                  />
                )}
                <br />
                {item.type === "select" && (
                  <select
                    style={{ margin: -6 }}
                    value={item.value}
                    disabled={buttonDisabled}
                    onChange={(e) => onInputChange(e, index)}
                  >
                    <br />
                    {item.options.map((option, index) => {
                      return (
                        <>
                          <option key={index}>{option}</option>
                        </>
                      );
                    })}
                  </select>
                )}
              </>
            );
          })}
          <br />
          <br />
          {buttonDisabled ? (
            <Button
              variant="contained"
              type="submit"
              disabled={buttonDisabled}
              onClick={handleSubmit}
              style={{ color: "white" }}
            >
              Submiting
            </Button>
          ) : (
            <Button
              type="submit"
              // disabled={buttonDisabled}
              onClick={handleSubmit}
              style={{ color: "white", backgroundColor: "blue" }}
            >
              Submit
            </Button>
          )}
          <div>
            {Object.keys(response).length > 0 && JSON.stringify(response)}
          </div>
        </div>
      )}
    </>
  );
}

export default FormWrapper;
