const Footer = () => {
    return (
    <footer className="footer pt-10 pb-2 px-[5vw] bg-primary text-white text-lg font-bold flex flex-col mt-20">
      <div className="flex flex-wrap items-start justify-center w-full">
        <div className="flex flex-col items-center text-center px-[20vw] mb-5 w-full"> 
          <img src="images/logo-footer.svg" alt="fromme" className="w-[250px]"></img>
          <p className="font-normal mt-3">The new creative economy</p> 
        </div> 
        <div className="flex flex-col leading-10 text-center mb-5 w-[40vw] md:w-[20vw]">
          <span className="footer-title">Links</span> 
          <a className="link link-hover">Privacy policy</a> 
          <a className="link link-hover">Cookies policy</a> 
          <a className="link link-hover">Legal</a> 
          <a className="link link-hover">Contact</a>
        </div> 
        <div className="flex flex-col leading-10 text-center mb-5 w-[40vw] md:w-[20vw]">
          <span className="footer-title text-white">Legal</span> 
          <a className="link link-hover flex flex-col">Terms of use</a> 
          <a className="link link-hover flex flex-col">Privacy policy</a> 
          <a className="link link-hover flex flex-col">Cookie policy</a>
        </div> 
        <div className="flex flex-col leading-10 justify-center text-center px-10 w-full md:w-[45vw] xl:w-[25vw]">
          <span className="footer-title flex flex-col">Contact</span> 
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Subscribe to our newsletter to get more courses and resources</span>
            </label> 
            <div className="relative text-gray-600">
              <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-8" /> 
              <button className="btn btn-secondary absolute top-0 right-0 rounded-l-none">Send</button>
            </div>
          </div>
        </div>
      </div>
      <div className="divider h-[1px] mb-2 bg-base-100"></div>
      <p className="footer-center pt-0 pb-5 w-full">Copyright © 2023 Mutter Lab S.L. Fromme. All rights reserved</p> 
    </footer>
  );
};
export default Footer;