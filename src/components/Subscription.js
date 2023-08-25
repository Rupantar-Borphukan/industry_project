import React, { useEffect, useState } from "react";

const Subscription = () => {
  const [plans, setPlans] = useState([]);
  const [isMonth, setIsMonth] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      let url = "http://127.0.0.1:5000/api/plan";

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });
      const data = await res.json();
      setPlans(data.plans);
    }
    fetchData();
  }, []);
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-1/2  flex flex-col justify-center relative ">
        <h1 className="text-3xl font-semibold text-center p-4">
          Choose a plan that’s right for you
        </h1>
        <div className="absolute top-[100px] left-5 bg-blue-500 rounded-full">
          <button
            className={`p-2 m-2 rounded-full ${
              isMonth ? "bg-white" : "text-white"
            }`}
            onClick={() => setIsMonth(true)}
          >
            Monthly
          </button>
          <button
            className={`p-2 m-2 rounded-full ${
              isMonth ? "text-white" : "bg-white"
            }`}
            onClick={() => setIsMonth(false)}
          >
            Yearly
          </button>
        </div>
        <div className="flex justify-end">
          <div className="header box-border w-9/12 flex justify-center">
            {plans.map((plan, index) => {
              return (
                <div
                  key={index}
                  className={`w-3/12 h-28 m-3 bg-blue-500 rounded opacity-50 text-white flex-auto flex justify-center items-center cursor-pointer ${
                    selectedPlan === index ? "opacity-100" : ""
                  }`}
                  onClick={() => setSelectedPlan(index)}
                >
                  {plan.plan_name}
                </div>
              );
            })}
          </div>
        </div>
        <table className="flex flex-col text-gray-700">
          <tbody className="flex flex-col">
            <tr className="flex items-center border-b border-black">
              <td className="w-3/12 text-left  px-4  box-border">
                {isMonth ? "Monthly" : "Yearly"}
              </td>
              {plans.map((plan, index) => {
                return (
                  <td
                    key={index}
                    className={`flex-auto w-{18.75} text-center py-3 ${
                      selectedPlan === index ? "text-blue-600" : ""
                    }`}
                  >
                    {"₹" + (isMonth ? plan.m_price : plan.y_price)}
                  </td>
                );
              })}
            </tr>
            <tr className="flex items-center border-b  border-black">
              <td className="w-3/12 text-left py-3 px-4  box-border">
                Video Quality
              </td>
              {plans.map((plan, index) => {
                return (
                  <td
                    key={index}
                    className={`flex-auto w-{18.75} text-center  m-3 ${
                      selectedPlan === index ? "text-blue-600" : ""
                    }`}
                  >
                    {plan.video_quality}
                  </td>
                );
              })}
            </tr>
            <tr className="flex items-center border-b  border-black">
              <td className="w-3/12 text-left py-3 px-4  box-border">
                Resolution
              </td>
              {plans.map((plan, index) => {
                return (
                  <td
                    key={index}
                    className={`flex-auto w-{18.75} text-center  m-3 ${
                      selectedPlan === index ? "text-blue-600" : ""
                    }`}
                  >
                    {plan.resolution + "p"}
                  </td>
                );
              })}
            </tr>
            <tr className="flex items-center border-b  border-black  box-border">
              <td className="w-3/12 text-left py-3 px-4">
                Devices you can use to watch
              </td>
              {plans.map((plan, index) => {
                return (
                  <td
                    key={index}
                    className={`flex-auto w-{15.95} text-center flex flex-col  m-3 ${
                      selectedPlan === index ? "text-blue-600" : ""
                    }`}
                  >
                    {plan.devices.map((device) => {
                      return <div className="py-2 text-xs">{device}</div>;
                    })}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        <button className="m-4 rounded h-11 bg-blue-400 text-white hover:bg-blue-600">
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Subscription;
