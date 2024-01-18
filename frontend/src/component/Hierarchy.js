import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../layout/Sidebar";
// import pic1 from "../images/pic1.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

const Hierarchy = () => {
  const [layers, setLayers] = useState([]);

  const handleAddLayer = () => {
    setLayers((prevLayers) => [
      ...prevLayers,
      {
        name: `New Layer ${prevLayers.length + 1}`,
        authority: "",
        children: [],
        imageUrl: `/images/image${prevLayers.length + 1}.jpg`,
      },
    ]);
    console.log(layers);
  };

  const handleAddChildLayer = (parentIndex) => {
    const parentLayer = layers[parentIndex];
    if (parentLayer.children.length === 0) {
      setLayers((prevLayers) => {
        const newLayers = [...prevLayers];

        newLayers[parentIndex].children.push({
          name: `Child Layer ${newLayers[parentIndex].children.length + 1}`,
          authority: "",
          children: [],
        });
        return newLayers;
      });
    } else {
      console.log(
        "Child layer already exists. You can choose to handle this case differently."
      );
    }
  };

  const handleDeleteLayer = (parentIndex, childIndex) => {
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      if (childIndex !== undefined) {
        newLayers[parentIndex].children.splice(childIndex, 1);
      } else {
        newLayers.splice(parentIndex, 1);
        newLayers.forEach((layer, index) => {
          layer.name = `Layer ${index + 1}`;
        });
      }
      return newLayers;
    });
  };

  const handleAddAuthority = (parentIndex, childIndex) => {
    const selectedLayer =
      childIndex !== undefined
        ? layers[parentIndex].children[childIndex]
        : layers[parentIndex];
    const authority = prompt("Select Authority: Manager, Team Lead, Developer");
    if (
      authority &&
      ["Manager", "Team Lead", "Developer"].includes(authority)
    ) {
      selectedLayer.authority = authority;
      setLayers([...layers]);
    }
  };

  const renderLayers = (layers, parentIndex) => {
    return layers.map((layer, childIndex) => (
      <Styled key={childIndex}>
        <div>
          {layer !== undefined ? layer.authority : layer.name}
          <ActionButtonContainer>
            <button
              className="bg-blue-400 hover:bg-blue-800 text-white rounded-xl px-2 py-2"
              onClick={() => handleAddChildLayer(parentIndex)}
            >
              Add
            </button>
            <button
              className="m-1 bg-red-400 hover:bg-red-800 text-white rounded-xl px-3 py-2"
              onClick={() => handleDeleteLayer(parentIndex, childIndex)}
            >
              Delete
            </button>
            <button
              className="m-1 bg-green-400 hover:bg-green-800 text-white rounded-xl px-3 py-2"
              onClick={() => handleAddAuthority(parentIndex, childIndex)}
            >
              Authority
            </button>
          </ActionButtonContainer>
          {layer.authority && <div>{`Authority: ${layer.authority}`}</div>}
        </div>
        {layer.children && layer.children.length > 0 && <Line />}
        {layer.children && renderLayers(layer.children, childIndex)}
      </Styled>
    ));
  };

  return (
    <Container>
      <Sidebar />
      <button
        className="bg-purple-600 text-white  m-14 rounded-3xl px-3 py-2 "
        onClick={handleAddLayer}
      >
        Add Layer
      </button>
      <FlowChartContainer>
        {layers.map((layer, parentIndex) => (
          <StyledNode key={parentIndex}>
            <div>
              {layer.name}
              <ActionButtonContainer>
                <button
                  className="m-1  text-white rounded-2xl px-4 py-2"
                  onClick={() => handleAddChildLayer(parentIndex)}
                >
                  {layer.imageUrl && (
              <img
                className=""
                src={layer.imageUrl}
                alt={`Profile of ${layer.name}`}
                height={60}
                width={60}
              />
            )}
                  {/* <div>
                    <img
                      className=""
                      src={pic1}
                      alt="Profile"
                      height={60}
                      width={60}
                    />
                  </div> */}
                </button>

                <button
                  className="m-1  hover:bg-red-400 text-red-700 rounded-xl px-3 py-2"
                  onClick={() => handleDeleteLayer(parentIndex)}
                >
                  <DeleteIcon />
                </button>
                <button
                  className="m-1 hover:bg-green-400 text-green-600 rounded-3xl px-3 py-2"
                  onClick={() => handleAddAuthority(parentIndex)}
                >
                  <PersonIcon />
                </button>
              </ActionButtonContainer>
              {layer.authority && <div>{`Authority: ${layer.authority}`}</div>}
            </div>
            {layer.children && layer.children.length > 0 && <Line />}
            {layer.children && renderLayers(layer.children, parentIndex)}
            
          </StyledNode>
        ))}
      </FlowChartContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const FlowChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledNode = styled.div`
  margin: 10px;
  padding: 25px;
  border-radius: 30px;
  display: inline-block;
  border: 2px solid blue;
  background-size: cover;
  background-position: center;
  position: relative;
`;
const Styled = styled.div`
  margin: 10px;
  padding: 25px;
  border-radius: 30px;
  display: inline-block;
  border: 2px solid gray;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  width: 2px;
  height: 10%;
  background-color: green;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export default Hierarchy;
