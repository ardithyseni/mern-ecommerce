import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import SearchInput from "../../../components/forms/SearchInput";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  // search & filter step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
      console.log(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`Category: ${res.data.name} created!`);
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  const handleRemoveCategory = async (slug) => {
    if (window.confirm("Delete Category?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          console.log("REMOVE CATEGORY THEN", res.data.deletedCategory.name);
          toast.error(`${res.data.deletedCategory.name} category deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  // const categoryForm = () => (

  //     <form onSubmit={handleSubmit}>

  //         <div className="form-group">
  //             <input
  //                 type="text"
  //                 className="form-control"
  //                 placeholder="Category Name"
  //                 value={name}
  //                 onChange={(e) => setName(e.target.value)}
  //                 autoFocus
  //                 required
  //             />
  //         </div>

  //         <br />
  //         <Button
  //             onClick={handleSubmit}
  //             type="primary"
  //             block
  //             size="large"
  //             shape="round"
  //             icon={loading ? <LoadingOutlined /> : <CheckOutlined />}
  //             className="mb-2"
  //             disabled={name.length < 2}
  //         >
  //             Save
  //         </Button>
  //     </form>
  // )

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="container p-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h4>Create category</h4>
              {/* {categoryForm()} */}
              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                buttonName="Create"
              />
            </div>
          </div>

          <hr />

          <SearchInput keyword={keyword} setKeyword={setKeyword} />

          <table className="table table-hover w-auto mt-1">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">
                  <span className="float-right">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.filter(searched(keyword)).map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>

                  <td>
                    <span
                      key="delete"
                      onClick={() => handleRemoveCategory(c.slug)}
                      className="btn btn-sm float-right"
                    >
                      <DeleteOutlined
                        style={{ fontSize: "23px" }}
                        className="text-danger"
                      />
                    </span>
                    <Link to={`/admin/category/${c.slug}`}>
                      <span key="edit" className="btn btn-sm float-right">
                        <EditOutlined style={{ fontSize: "23px" }} />
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Table columns={columns} dataSource={categories} /> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
