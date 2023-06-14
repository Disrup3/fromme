const Footer = () => {
    return (
<footer className="footer pt-10 pb-2 px-20 leading-10 bg-primary text-white text-lg font-bold flex flex-col">
<div className="flex flex-wrap sm:flex-col sm:items-center lg:items-start lg:flex-row justify-between w-full p-0">
<div className="flex flex-col"> 
  <span className="footer-title flex flex-col py"></span>
  <img className="py-10 w-25" src="images/logo-footer.svg" alt="fromme logo"></img>
  <p className="flex flex-col">The new creative economy.</p> 
</div> 
<div className="flex flex-col lg:w-auto sm:w-[200px]">
  <span className="footer-title flex flex-col">Links</span> 
  <a className="link link-hover flex flex-col">Privacy policy</a> 
  <a className="link link-hover flex flex-col">Cookies policy</a> 
  <a className="link link-hover flex flex-col">Legal</a> 
  <a className="link link-hover flex flex-col">Contact</a>
</div> 
<div className="flex flex-col lg:w-auto sm:w-[200px]">
  <span className="footer-title text-white flex flex-col">Legal</span> 
  <a className="link link-hover flex flex-col">Terms of use</a> 
  <a className="link link-hover flex flex-col">Privacy policy</a> 
  <a className="link link-hover flex flex-col">Cookie policy</a>
</div> 
<div className="flex flex-col lg:w-auto sm:w-[200px]">
  <span className="footer-title flex flex-col">Contact</span> 
  <div className="form-control w-80">
    <label className="label">
      <span className="label-text text-white">Subscribe to our newsletter to get more courses and resources</span>
    </label> 
    <div className="relative">
      <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-8" /> 
      <button className="btn btn-secondary absolute top-0 right-0 rounded-l-none">Send</button>
    </div>
  </div>
</div>
</div>
<div className="divider h-[1px] mb-2 bg-base-100"></div>
<p className="footer-center pt-0 w-full">Copyright © 2023 Mutter Lab S.L. Fromme. All rights reserved</p> 
</footer>
  );
};
export default Footer;