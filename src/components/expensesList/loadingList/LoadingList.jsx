import { Skeleton } from "@mui/material";
import React from "react";

const LoadingList = (props) => {
  switch (props.type) {
    case "expense":
      return (
        <tr>
          <td style={{ backgroundColor: "#ccc" }}> </td>
          <td>
            <Skeleton width={20} height={20} />
          </td>
          <th>
            <Skeleton width={80} height={20} />
            <Skeleton width={20} height={20} />
          </th>
          <td>
            <Skeleton width={80} height={20} />
            <Skeleton width={20} height={20} />
          </td>
          <td>
            <Skeleton width={80} height={20} />
          </td>
          <td>
            <Skeleton width={80} height={20} />
          </td>
          <td style={{ backgroundColor: "#ccc" }}> </td>
          <td>
            <Skeleton width={80} height={20} />
          </td>
          <td>
            <Skeleton width={100} height={20} />
            <Skeleton width={70} height={20} />
          </td>
          <td>
            <div className="d-flex h-100 align-items-center">
              $ <Skeleton width={40} height={20} className="ms-2" />
            </div>
          </td>
          <td>
            <Skeleton width={150} height={20} />
          </td>
        </tr>
      );
    case "income":
      return (
        <tr>
          <td style={{ backgroundColor: "#ccc" }}> </td>
          <th>
            <Skeleton width={80} height={20} />
            <Skeleton width={20} height={20} />
          </th>
          <td>
            <Skeleton width={80} height={20} />
          </td>
          <td>
            <Skeleton width={80} height={20} />
          </td>
          <td>
            <Skeleton width={80} height={20} />
          </td>
          <td style={{ backgroundColor: "#ccc" }}> </td>
          <td>
            <Skeleton width={80} height={20} />
          </td>
          <td>
            <Skeleton width={100} height={20} />
            <Skeleton width={70} height={20} />
          </td>
          <td>
            <div className="d-flex h-100 align-items-center">
              $ <Skeleton width={40} height={20} className="ms-2" />
            </div>
          </td>
          <td>
            <Skeleton width={150} height={20} />
          </td>
        </tr>
      );
    default:
      return null;
  }
};

export default LoadingList;
