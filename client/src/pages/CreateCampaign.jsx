import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ethers} from "ethers";
import {money} from "../assets"
import {CustomButton, FormField} from "../components";
import {checkIfImage} from "../utils";
import {useStateContext} from "../context";

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const {createCampaign} = useStateContext();
    const [form, setForm] = useState({
        name: "",
        title: "",
        description: "",
        target: "",
        deadline: "",
        image: "",
    });

    const handleFormFieldChange = (fieldName, e) => {
        setForm({...form, [fieldName]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        checkIfImage(form.image, async (exists) => {
            if (exists) {
                setIsLoading(true);
                await createCampaign({...form, target: ethers.utils.parseUnits(form.target, 18)});
                setIsLoading(false);
                navigate("/");
            } else {
                alert("Please enter a valid image URL");
                setForm({...form, image: ""});
            }
        });

        console.log(form);
    }

    return (
        <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
            {isLoading && 'Loader...'}
            <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] violet-gradient rounded-[10px]">
                <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a
                    Campaign</h1>
            </div>
            <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        labelName="Your Name"
                        placeholder="John Doe"
                        value={form.name}
                        inputType="text"
                        handleChange={(e) => handleFormFieldChange("name", e)}
                    />
                    <FormField
                        labelName="Campaign Title"
                        placeholder="Write a title"
                        value={form.title}
                        inputType="text"
                        handleChange={(e) => handleFormFieldChange("title", e)}/>
                </div>
                <FormField
                    labelName="Story"
                    placeholder="Write your story"
                    value={form.description}
                    isTextArea
                    handleChange={(e) => handleFormFieldChange("description", e)}/>
                <div className="w-full flex justify-center items-center violet-gradient h-[120px] rounded-[10px]">
                    <img src={money} alt="money" className="w-[40px] h-[40px] object-contain ml-8"/>
                    <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the
                        raised amount</h4>
                </div>
                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        labelName="Goal"
                        placeholder="ETH 0.5"
                        value={form.target}
                        inputType="text"
                        handleChange={(e) => handleFormFieldChange("target", e)}/>
                    <FormField
                        labelName="End Date"
                        placeholder="End Date"
                        value={form.deadline}
                        inputType="date"
                        handleChange={(e) => handleFormFieldChange("deadline", e)}/>
                </div>
                <FormField
                    labelName="Campaign Image"
                    placeholder="Place an image URL of your campaign"
                    value={form.image}
                    inputType="url"
                    handleChange={(e) => handleFormFieldChange("image", e)}/>
                <div className="flex justify-center items-center mt-[20px]">
                    <CustomButton
                        btnType="submit"
                        title="Submit"
                        styles="violet-gradient"
                    />
                </div>
            </form>
        </div>
    );
}

export default CreateCampaign;