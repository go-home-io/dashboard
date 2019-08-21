function sleep(sleepDuration) {
    // Sleep for sleepDuration in ms
    const now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}

export default sleep;