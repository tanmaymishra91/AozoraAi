
import React from 'react';

type IconName = 'generate' | 'edit' | 'analyze' | 'credits' | 'spinner' | 'upload' | 'sun' | 'moon' | 'download' | 'logout' | 'eye' | 'eye-off' | 'chat' | 'admin' | 'user' | 'arrow-right' | 'lightning' | 'shield-check' | 'star' | 'plus' | 'minus';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'arrow-right':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
        );
    case 'lightning':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
        );
    case 'shield-check':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 0A11.953 11.953 0 0 1 12 2.25c1.537 0 3.02.252 4.402.714" />
            </svg>
        );
    case 'star':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006Z" clipRule="evenodd" />
            </svg>
        );
    case 'plus':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        );
    case 'minus':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
        );
    case 'admin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.878-5.878m0 0L21 5.625A2.652 2.652 0 0 0 17.25 3h-1.062a2.652 2.652 0 0 0-1.87 1.871l-5.878 5.878m0 0L2.25 5.625v1.062a2.652 2.652 0 0 0 1.871 1.87L9.375 15.17l2.046-2.046m0 0L17.25 3l-5.878 5.878" />
        </svg>
      );
    case 'user':
       return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      );
    case 'generate':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
        </svg>
      );
    case 'edit':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      );
    case 'analyze':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        );
    case 'chat':
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                {...props}
            >
                <g>
                    <path d="M306.265,206.421c17.836,0,32.349-14.51,32.349-32.348s-14.512-32.348-32.349-32.348 c-17.836,0-32.348,14.51-32.348,32.348S288.429,206.421,306.265,206.421z M306.265,157.918c8.909,0,16.158,7.248,16.158,16.157 s-7.248,16.157-16.158,16.157c-8.908,0-16.157-7.248-16.157-16.157S297.358,157.918,306.265,157.918z" />
                    <path d="M456.241,232.053h-31.19V94.105c0-30.746-25.013-55.759-55.758-55.759H55.759C25.014,38.345,0,63.359,0,94.105v159.82 c0,30.746,25.014,55.759,55.759,55.759h0.079c-4.496,13.234-11.42,25.638-20.327,36.326c-6.933,8.319-7.413,19.868-1.196,28.735 c4.565,6.512,11.72,10.122,19.234,10.121c2.718,0,5.482-0.473,8.188-1.45c35.631-12.881,64.98-39.589,81.258-73.733h73.822 v56.903c0,30.746,25.013,55.759,55.759,55.759h137.67c11.53,23.205,31.747,41.327,56.182,50.16 c2.141,0.774,4.327,1.147,6.478,1.147c5.942,0,11.603-2.856,15.214-8.006c4.918-7.015,4.537-16.149-0.948-22.73 c-5.763-6.916-10.261-14.906-13.229-23.431c22.509-7.441,38.058-28.437,38.058-52.9V287.81 C512,257.065,486.986,232.053,456.241,232.053z M216.816,293.493H137.78c-3.232,0-6.153,1.921-7.434,4.889 c-13.973,32.39-40.987,57.834-74.115,69.807c-4.99,1.809-7.891-1.641-8.659-2.737c-0.771-1.099-3.019-5,0.379-9.077 c12.7-15.24,21.871-33.531,26.522-52.895c0.579-2.411,0.022-4.956-1.514-6.903c-1.535-1.948-3.878-3.084-6.358-3.084H55.759 c-21.818,0-39.568-17.75-39.568-39.568V94.105c0-21.818,17.75-39.568,39.568-39.568h313.534c21.817,0,39.567,17.75,39.567,39.568 v137.947H272.575c-30.746,0-55.759,25.013-55.759,55.758V293.493z M462.553,405.649c-2.216,0.354-4.185,1.614-5.437,3.477 c-1.252,1.863-1.676,4.161-1.168,6.348c3.213,13.844,9.71,26.918,18.785,37.808c0.823,0.987,0.865,2.02,0.127,3.071 c-0.737,1.051-1.725,1.363-2.93,0.926c-21.94-7.93-39.831-24.782-49.087-46.234c-1.281-2.967-4.203-4.889-7.434-4.889H272.575 c-21.818,0-39.568-17.75-39.568-39.568v-78.777c0-21.817,17.75-39.567,39.568-39.567H456.24c21.818,0,39.568,17.75,39.568,39.567 v78.776h0.001C495.809,386.134,481.823,402.561,462.553,405.649z" />
                    <path d="M244.873,174.075c0-17.836-14.512-32.348-32.349-32.348s-32.348,14.51-32.348,32.348s14.51,32.348,32.348,32.348 S244.873,191.911,244.873,174.075z M212.526,190.23c-8.908,0-16.157-7.248-16.157-16.157c0-8.908,7.248-16.157,16.157-16.157 c8.909,0,16.158,7.248,16.158,16.157C228.683,182.982,221.435,190.23,212.526,190.23z" />
                    <path d="M118.786,141.727c-17.836,0-32.348,14.51-32.348,32.348s14.51,32.348,32.348,32.348s32.349-14.51,32.349-32.348 S136.622,141.727,118.786,141.727z M118.786,190.23c-8.908,0-16.157-7.248-16.157-16.157c0-8.908,7.248-16.157,16.157-16.157 c8.909,0,16.158,7.248,16.158,16.157C134.943,182.982,127.695,190.23,118.786,190.23z" />
                </g>
            </svg>
        );
    case 'credits':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0-2.66-13.339A2.25 2.25 0 0 0 16.243 2.25H7.757a2.25 2.25 0 0 0-2.096 1.411L3 12m18 0h-5.25m-10.5 0H3M15 9.75v.008" />
            </svg>
        );
    case 'spinner':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props} className={`animate-spin ${props.className}`}>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        );
    case 'upload':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
        );
    case 'sun':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591M12 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
            </svg>
        );
    case 'moon':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
        );
    case 'download':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
        );
    case 'logout':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
        );
    case 'eye':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        );
    case 'eye-off':
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243-4.243-4.243" />
            </svg>
        );
    default:
      return <svg {...props} />;
  }
};