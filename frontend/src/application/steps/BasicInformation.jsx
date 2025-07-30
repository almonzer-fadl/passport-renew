import { useEffect, useState } from "react"
import { allCountriesList } from "./Countries"
import { useTranslation } from "react-i18next";

// My main 
export function BasicInformation(props){
    const { t } = useTranslation();
    const {fullnameEn, setFullnameEn} = props.payload
    const {fullnameAr,setFullnameAr} = props.payload
    const {passportNo, setPassportNo} = props.payload
    const {birthday, setBirthday} = props.payload
    const {expiryDate, setExpiryDate} = props.payload
    const {nationalNo, setNationalNo}= props.payload
    const {birthPlace, setBirthPlace} = props.payload
    const {issueDate, setIssueDate} = props.payload
    const {gender, setGender} = props.payload
    
    const [error, setError] = useState('')
    const [expiryRange,setExpiryRange]= useState('')
    useEffect(()=>{
        const splitDate = issueDate.split('-')
        const afterFive = `${String(Number(splitDate[0])+5)}-${splitDate[1]}-${splitDate[2]}`
        setExpiryRange(afterFive)
    },[issueDate])

    const numbers = '1234567890'
    const symbols = '!@#$%^&*()_+=`~",./?|<>:؛÷`ـ،/:"؟.,×{}}ْ~ٍِ'
    const engChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const arChar = 'اأآإبتثجحخدذرزسشصضطظعغفقكلمنهويئءؤلآلال' 
    
    const formatNationalNumber = (input) => {
    // Remove all non-numeric characters
    const numbers = input.replace(/\D/g, '');
    
    // Limit to 11 digits
    const limited = numbers.slice(0, 11);
    
    // Apply formatting based on length
    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 7) {
      return `${limited.slice(0, 3)}-${limited.slice(3)}`;
    } else {
      return `${limited.slice(0, 3)}-${limited.slice(3, 7)}-${limited.slice(7)}`;
    }
  };

  //I know this is questionable but it was an AI method for creating radio button and it uses lists of object
  const genders = [{value:'male', label:t('male')}, {value:'female', label:t('female')}]
   const RadioGroup = ({ name, options, selected, onChange, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="mr-3 w-4 h-4  accent-blue-500 "
          />
          <div>
            <div className="font-medium">{option.label}</div>
            {option.description && (
              <div className="text-sm text-gray-500">{option.description}</div>
            )}
          </div>
        </label>
      ))}
    </div>
  );

    const today = new Date().toISOString().split('T')[0]
    
    const formDivideClasses = "flex flex-col sm:flex-row md:flex-row gap-5 min-w-full justify-center space-auto"

    return (
        <div className="grid p-10 grid-cols-1 lg:grid-cols-4  lg:max-w-2/3 lg:w-1/2 justify-center items-center gap-x-3 gap-y-5 mx-auto border-1 border-gray-300 rounded-2xl">

       
        
        <div role="alert" className="alert alert-info alert-outline col-span-1 lg:col-span-4 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <ul className="list-disc ">{t('infoInstruction')}
                <li>{t('namesAsInPassport')}</li>
                <li>{t('passportNoFormat')}</li>
                <li>{t('nationalNoFormat')}</li>
            </ul>
        </div>

        {error&& <div role="alert" className="alert alert-error my-10 col-span-1 lg:col-span-4 ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
        </div>}

        <div className="col-span-1 lg:col-span-2 ">
        <label htmlFor="fullname-en">{t('fullnameEn')}</label>
        <input type="text"
        name="fullname-en"
        className="input input-lg w-full"
            placeholder="Full Name"
            minLength={5}
            maxLength={50}
            value={fullnameEn}
            onChange={(e)=>{
                const name = e.target.value
                if(numbers.includes(name[name.length-1])){
                    setError(t('noNumbersInNames'))
                    return 
                }
                if(symbols.includes(name[name.length-1])){
                    setError(t('noSymbolsInNames'))
                    return
                }
                if(arChar.includes(name[name.length-1])){
                    setError(t('noArabicInEnglish'))
                    return 
                }
                if(engChar.includes(name[name.length-1])){
                    setError('')
                     
                }
                
                setFullnameEn(name)
            }}
        />

       </div>
       <div className="col-span-1 lg:col-span-2 ">
        <label htmlFor="fullname-ar">{t('fullnameAr')}</label>
        <input type="text"
        name="fullname-ar"
        className="input input-lg w-full"
            placeholder="الاسم كامل"
            minLength={5}
            maxLength={50}
            inputMode="text"
            value={fullnameAr}
            onChange={(e)=>{
                 const name = e.target.value
                if(numbers.includes(name[name.length-1])){
                    setError(t('noNumbersInNames'))
                    return 
                }
                if(symbols.includes(name[name.length-1])){
                    setError(t('noSymbolsInNames'))
                    return
                }
                if(engChar.includes(name[name.length-1])){
                    setError(t('noEnglishInArabic'))
                    return
                     
                }
                if(arChar.includes(name[name.length-1])){
                    setError('')
                     
                }
                
                setFullnameAr(name)
            }}
        />

       </div>
      


         
       <div className="col-span-1 lg:col-span-2 ">
        <label htmlFor="passport-number">{t('passportNo')}</label>
        <input type="text"
        className="input input-lg w-full"
        name="passport-number"
            placeholder="AA123456"
            minLength={5}
            maxLength={13}
            value={passportNo}
            inputMode="text"
            onChange={(e)=>{
                 const number = e.target.value
                if(symbols.includes(number[number.length-1])){
                    setError(t('noSymbols'))
                    return
                }
                if(arChar.includes(number[number.length-1])){
                    setError(t('noArabic'))
                    return 
                }


                if(number.length>2 && engChar.includes(number[number.length-1])){
                    setError(t('noLettersAfter2Digits'))
                    return
                }
                else if(number.length<2 &&numbers.includes(number[number.length-1])){
                    return setError(t('cannotStartWithNumber'))
                }else{
                    setError("")
                }
                
                setPassportNo(e.target.value)

            }}
        />
       </div>

        <div className="col-span-1 lg:col-span-2 ">
        <label htmlFor="national-number">{t('nationalNo')}</label>
        <input type="text"
        className="input input-lg w-full"
        name="national-number"
            value={nationalNo}
            placeholder="123-1234-1234"
            maxLength={13}
            minLength={13}
            inputMode="numeric"
            onChange={(e)=>{

                  const number = e.target.value
                if(symbols.includes(number[number.length-1])){
                    setError(t('noSymbols'))
                    return
                }
                if(arChar.includes(number[number.length-1])){
                    setError(t('noArabic'))
                    return 
                } 
                if(engChar.includes(number[number.length-1])){
                    setError(t('noEnglish'))
                    return 
                } 
                if(numbers.includes(number[number.length-1])){
                    setError('')
                }


                setNationalNo(formatNationalNumber(number))
            }}
        />
       </div>

       

         <div className="flex flex-col col-span-1 lg:col-span-3 ">
        <label htmlFor="birth-place">{t('birthPlace')}</label>
        <select type="text"
        className="select select-lg w-full"
        name="birth-place"
            value={birthPlace}
            inputMode="numeric"
            placeholder="place of birth"
            onChange={(e)=>{setBirthPlace(e.target.value)}}
        >
            <option value="" disabled >{t('chooseBirthPlace')}</option>
            {allCountriesList.map((country,index)=>(
                <option 
                key={index}
                value={country}
                >
                    {country}
                </option>
            ))}
        </select>
       </div>


       <div className="flex flex-col col-span-1 lg:col-span-1 ">
        <label htmlFor="birthday">{t('birthday')}</label>
        <input type="date"
        className="input input-lg w-full"
        name="birthday"
        inputMode="numeric"
            value={birthday}
            onChange={(e)=>{setBirthday(e.target.value)}}
            max={today}
            
        />
       </div>  
       
         
         <div className="flex flex-col col-span-1 lg:col-span-2 ">
        <label htmlFor="issuance">{t('issuanceDate')}</label>
        <input type="date"
        className="input input-lg w-full"
        name="issuance"
        inputMode="numeric"
            value={issueDate}
            max={today}
            onChange={(e)=>{setIssueDate(e.target.value)}}
        />
       </div>
         
         <div className="flex flex-col col-span-1 lg:col-span-2 ">
        <label htmlFor="expiry" >{t('expiryDate')}</label>
        <input type="date"
        className="input input-lg w-full"
        name="expiry"
        inputMode="numeric"
            value={expiryDate}
            min={expiryRange}
            onChange={(e)=>{setExpiryDate(e.target.value)}}
        />
       </div>
        

      <div className="col-span-1 lg:col-span-2 ">
        <label htmlFor="gender">{t('gender')}</label>
        <RadioGroup
        name="gender"
        options={genders}
        selected={gender}
        onChange={setGender}
        />
      </div>

      
       
        
       </div>
    )
}