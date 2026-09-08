from manim import *
from manim_scripts.lorentz_model import electron_state


class LorentzKraft(Scene):
    def construct(self):
        title = Text("Elektron im Magnetfeld", font_size=36).move_to(UP * 3.35)
        field_label = Text("Kreuze: Magnetfeld in die Bildebene", font_size=23,
                           color=BLUE).move_to(UP * 2.7)
        legend_v = Text("v: Geschwindigkeit", font_size=22, color=GREEN).move_to(LEFT * 3 + UP * 2.15)
        legend_f = Text("F: magnetische Kraft", font_size=22, color=RED).move_to(RIGHT * 2 + UP * 2.15)
        note = Text("Negative Ladung: Kraft entgegen der Regel fuer positive Ladungen.",
                    font_size=20).move_to(DOWN * 3.15)
        note2 = Text("Modell: gleichfoermiges Feld; Tempo bleibt gleich, Richtung aendert sich.",
                     font_size=18).move_to(DOWN * 3.6)
        for text, height, max_width in [(title,.42,13),(field_label,.32,13),
                (legend_v,.3,5.2),(legend_f,.3,5.2),(note,.24,13),(note2,.23,13)]:
            text.set_height(height)
            if text.width > max_width: text.set_width(max_width)
        crosses = VGroup(*[
            VGroup(Line(LEFT * .08 + UP * .08, RIGHT * .08 + DOWN * .08),
                   Line(LEFT * .08 + DOWN * .08, RIGHT * .08 + UP * .08))
            .set_color(BLUE).set_opacity(.4).move_to([x, y, 0])
            for x in range(-5, 5) for y in range(-2, 2)
        ])
        path = ParametricFunction(lambda t: np.array(electron_state(t)[0]),
                                  t_range=[0, 1], color=GRAY).set_stroke(width=2)
        tracker = ValueTracker(0)
        particle = Dot(radius=.13, color=YELLOW)
        label = Text("e-", font_size=23, color=YELLOW)
        velocity = Arrow(ORIGIN, RIGHT, color=GREEN, buff=0)
        force = Arrow(ORIGIN, DOWN, color=RED, buff=0)
        v_label = Text("v", font_size=22, color=GREEN)
        f_label = Text("F", font_size=22, color=RED)

        def update_model(_=None):
            p, v, f = [np.array(value) for value in electron_state(tracker.get_value())]
            particle.move_to(p)
            label.move_to(p + LEFT * .45 + UP * .25)
            velocity.put_start_and_end_on(p, p + v * 1.4)
            force.put_start_and_end_on(p, p + f)
            v_label.move_to(p + v * 1.65)
            f_label.move_to(p + f * 1.25)

        for text in [label, v_label, f_label]: text.set_height(.28)
        update_model()
        moving = VGroup(velocity, force, particle, label, v_label, f_label)
        moving.add_updater(update_model)
        self.add(title, field_label, legend_v, legend_f, note, note2,
                 crosses, path, moving)
        self.wait(1)
        self.play(tracker.animate.set_value(1), run_time=8, rate_func=linear)
        moving.clear_updaters()
        update_model()
        self.wait(2)
