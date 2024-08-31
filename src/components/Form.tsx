import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormData } from "../types";
import { getWeatherData, WeatherData } from "../services/weatherService";

type FormProps = {
    setWeather: Dispatch<SetStateAction<WeatherData | null>>,
    setError: Dispatch<SetStateAction<string>>
}

const Form = ({ setWeather, setError} : FormProps) => {
    const initialValues: FormData = {
        cityName: "",
        countryCode: ""
    };

    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        try {
            const data = await getWeatherData(formData);
            setWeather(data);
            setError("");
        } catch (error) {
            if(error instanceof Error) {
                setWeather(null);
                setError(error.message);
            }
        }
    };

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input
                className="text-cyan-950 p-1 font-medium rounded-sm outline-none border-2 border-transparent focus:border-cyan-800"
                defaultValue={initialValues.cityName}
                placeholder="City name"
                {...register(
                    "cityName",
                    {
                        required: true,
                        pattern: /^[a-zA-Z\u00C0-\u017F]+(?:[\s\-'][a-zA-Z\u00C0-\u017F]+)*$/,
                    })}
            />
            {/* errors will return when field validation fails  */}
            {errors.cityName && <span className="bg-red-700 p-1 font-medium text-white">This Field must contain a city name.</span>}

            {/* include validation with required or other standard HTML validation rules */}
            <input
                className="text-cyan-950 p-1 font-medium rounded-sm outline-none border-2 border-transparent focus:border-cyan-800"
                defaultValue={initialValues.countryCode}
                placeholder="Country code"
                {...register(
                    "countryCode",
                    {
                        required: true,
                        pattern: /^[A-Z]{2,3}$/
                    })}
            />
            {/* errors will return when field validation fails  */}
            {errors.countryCode && <span className="bg-red-700 p-1 font-medium text-white">This field must contain at least 2 uppercase letters.</span>}

            <input
                className="bg-cyan-950 mt-4 text-white font-medium py-1 rounded-sm cursor-pointer transition-colors hover:bg-cyan-800"
                type="submit"
                value="Get Weather"
            />
        </form>
    )
}

export default Form;