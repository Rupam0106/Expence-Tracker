import axios from "axios";
import { useEffect, useState } from "react";

const User = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res: any) => {
      setData(res.data.products);
    });
  }, []);

  // const addUser = () => {
  //   const newUser= { id: 0, title: "Iphone 16" };
  //   // setData([newUser, ...data]);
  // };

  const handleDelete = (id: any) => {
    const result = data.filter((res: any) => res.id !== id);
    setData(result);
  };

  return (
    <div>
      <button className="p-2 bg-red-500 text-white rounded-md m-1">Add</button>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border divide-y">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left">Sr.</th>
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Rating</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {data.map(({ id, title, price, rating }: any) => (
              <tr key={id}>
                <td className="py-3 px-6 whitespace-nowrap">{id}</td>
                <td className="py-3 px-6 whitespace-nowrap">{title}</td>
                <td className="py-3 px-6 whitespace-nowrap">{price}</td>
                <td className="py-3 px-6 whitespace-nowrap">{rating}</td>

                <button
                  className="p-2 bg-green-500 text-white rounded-md m-1"
                  onClick={() => handleDelete(id)}
                >
                  Update
                </button>
                <button
                  className="p-2 bg-red-500 text-white rounded-md mt-1"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
