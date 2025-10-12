export default function FormContainer({ children }) {
    return(
        <div className={`flex flex-col p-2 rounded bg-gray-50 border-2 outline border-t-secondary border-l-secondary
         shadow-md outline-primary outline-2`}>
            {children}
        </div>
    );
}