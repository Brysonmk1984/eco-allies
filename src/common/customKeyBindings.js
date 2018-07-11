const bindAddModalCombo = function(cb){
    document.addEventListener ("keydown", function (zEvent) {
        if (zEvent.ctrlKey  &&  zEvent.altKey  &&  zEvent.code === "KeyQ") {
            cb();
        }
    } );
}

export { bindAddModalCombo };