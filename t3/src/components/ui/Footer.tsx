const Footer = () => {
    return (
<footer className="footer p-10 bg-primary text-base-content">

<div>
  <span className="footer-title">fromme</span>
  <img src="images/logo.png" alt="fromme logo" width="50" height="60"></img>
  <p>The new creative economy.</p> 
</div> 
<div>
  <span className="footer-title">Links</span> 
  <a className="link link-hover">Privacy policy</a> 
  <a className="link link-hover">Cookies policy</a> 
  <a className="link link-hover">Legal</a> 
  <a className="link link-hover">Contact</a>
</div> 
<div>
  <span className="footer-title">Legal</span> 
  <a className="link link-hover">Terms of use</a> 
  <a className="link link-hover">Privacy policy</a> 
  <a className="link link-hover">Cookie policy</a>
</div> 
<div>
  <span className="footer-title">Contact</span> 
  <div className="form-control w-80">
    <label className="label">
      <span className="label-text">Enter your email address</span>
    </label> 
    <div className="relative">
      <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" /> 
      <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Send</button>
    </div>
  </div>
</div>
</footer>
  );
};
export default Footer;