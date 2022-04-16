import Vue from 'vue';

export default () => {
    const styles = {
        primary: '#0092D8',
        background: '#122946'
    }

    document.documentElement.style.setProperty('--ux-primary', styles.primary);
    document.documentElement.style.setProperty('--ux-background', styles.background);

    Vue.prototype.$ux = styles;
};
