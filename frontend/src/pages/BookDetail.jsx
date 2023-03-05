import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BookDetail() {
  let { id } = useParams();
  const [item, setItem] = useState(null);
  useEffect(() => {
    const getItem = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/all/${id}/`);
      setItem(res.data);
    };
    getItem();
  }, []);
  console.log(item);
  return <div className="mt-5 w-4/5 m-auto">
        {item && <div className="flex justify-start">
        <img src={item.cover} alt={item.title} />
        <div className="ml-20 ">
          <div className="mt-10 font-bold flex gap-4  justify-between" >
            <div className="flex gap-3">
              <p className=" text-2xl ">{item.title}</p>
              <p>{item.cost}$ </p>
            </div>
            <Link  to={'/book/edit/'+item.id} className="px-7 py-2 bg-yellow-300 rounded text-gray-600"  >Edit</Link>
          </div>
            <p className="mt-10 text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem nam autem velit hic voluptatum quas impedit est dolorum cum placeat doloribus error, facere accusantium mollitia, perspiciatis laudantium commodi repellat maxime possimus. Sequi optio commodi perferendis animi delectus cupiditate! Natus quis corporis sunt at temporibus numquam sed animi nulla suscipit! Omnis, dolorem. Blanditiis et explicabo quod, quidem modi repellat eius minima magni atque, ad inventore harum minus sint eos! Modi labore omnis natus placeat architecto error ut facilis vel fugit odio!</p>
        </div>
        </div>}
  </div>;
}
