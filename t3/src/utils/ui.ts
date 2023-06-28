export const getInitials = (name: string) => {
    let initials: string = name.charAt(0);
    let i = 0;
    while(initials.length < 2 && i < name.length) {
        if(name.charAt(i) == " ") {
            initials += name.charAt(i+1);
        }
        i++;
    }
    return initials;
}